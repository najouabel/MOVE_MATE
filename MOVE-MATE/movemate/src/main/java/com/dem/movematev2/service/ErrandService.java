package com.dem.movematev2.service;


import com.dem.movematev2.exception.ErrandNotFoundException;
import com.dem.movematev2.model.ErrandDTO;
import com.dem.movematev2.model.ErrandRequest;
import com.dem.movematev2.model.entity.Errand;
import com.dem.movematev2.model.entity.Recipient;
import com.dem.movematev2.model.entity.ServiceProvider;
import com.dem.movematev2.model.entity.User;
import com.dem.movematev2.repository.ErrandRepository;
import com.dem.movematev2.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ErrandService {

    private final EntityManager entityManager;
    private final UserRepository userRepository;
    private final ErrandRepository errandRepository;

    public ErrandDTO save(ErrandRequest errandRequest){
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken)
            throw new RuntimeException("User not authenticated");

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

        if(user.isEmpty())  throw new RuntimeException("User not exist");

        Errand errand =
                Errand.builder()
                    ._from(errandRequest._from())
                    ._to(errandRequest._to())
                    .description(errandRequest.description())
                    .meantype(errandRequest.meantype())
                    .service(errandRequest.service())
                        .serviceProvider(new ServiceProvider( user.get() ))
                    .build();

        return toDTO(errandRepository.saveAndFlush(errand));
    }

    public Page<ErrandDTO> getAll(Integer page, Integer maxItems){
        Pageable pageable =
                PageRequest
                        .of(page, maxItems, Sort.by("createdAt").descending());

        Page<Errand> errands = errandRepository.findAll(pageable);

        return toPageOfDTO(errands);

    }
    public Page<ErrandDTO> getAllByProvider(Long providerId, Integer page, Integer maxItems, User serviceProvider){
        Pageable pageable =
                PageRequest
                        .of(page, maxItems, Sort.by("createdAt").descending());

        Page<Errand> errands =
                errandRepository
                        .findAllByServiceProviderId(
                                providerId != null ? providerId : serviceProvider.getId(),
                                pageable);

        return toPageOfDTO(errands);

    }


    public Errand getById(Long id){
        Errand errand =
                errandRepository.findById(id)
                        .orElseThrow(() -> new ErrandNotFoundException("Invalid Errand ID"));
        return errand;

    }

    public synchronized void deleteById(Long id) throws ErrandNotFoundException {
        if(!errandRepository.existsById(id)){
            throw new ErrandNotFoundException("Invalid Errand ID");
        }

        errandRepository.deleteById(id);
    }

    public ErrandDTO toDTO(Errand errand){
        return
            ErrandDTO
                .builder()
                    .id(errand.getId())
                    .username(errand.getServiceProvider().getUsername())
                    .from(errand.get_from())
                    .to(errand.get_to())
                    .createdAt(errand.getCreatedAt())
                    .description(errand.getDescription())
                    .meantype(errand.getMeantype())
                    .service(errand.getService())
                    .build();
    }

    private Page<ErrandDTO> toPageOfDTO(Page<Errand> errandPage){
        return errandPage
                .map( errand -> toDTO(errand) );
    }
}
