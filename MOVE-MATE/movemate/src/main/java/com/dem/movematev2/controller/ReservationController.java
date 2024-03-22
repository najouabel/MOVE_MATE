package com.dem.movematev2.controller;

import com.dem.movematev2.exception.ErrandNotFoundException;
import com.dem.movematev2.model.ReservationDTO;
import com.dem.movematev2.model.ReservationRequest;
import com.dem.movematev2.model.entity.Reservation;
import com.dem.movematev2.model.entity.User;
import com.dem.movematev2.service.ReservationService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> save(
            Authentication authentication,
           @RequestBody ReservationRequest reservationRequest ) throws IllegalAccessException {
        final ReservationDTO reservationDTO =
                reservationService.save(
                        reservationRequest,
                        (User) authentication.getPrincipal() );

        return ResponseEntity.status(201).body(reservationDTO);
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "itemsNum", defaultValue = "10") Integer numberOfItems
    ){
        final Page<ReservationDTO> errandDTOList = reservationService.getAll(page, numberOfItems);

        return ResponseEntity.ok().body( errandDTOList.getContent() );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(
            @PathVariable Long id ){
        final ReservationDTO errand = reservationService.getById(id);

        return ResponseEntity.ok().body(errand);
    }

    @RolesAllowed("RECIPIENT")
    @GetMapping("/recipient")
    public ResponseEntity<?> getMyReservations(
            Authentication authentication,
            @RequestParam(defaultValue = "34") Integer  maxItems,
            @RequestParam(defaultValue = "0") Integer requestedPage
    ){
        Page<Reservation> reservations = reservationService.getMyReservations((User)authentication.getPrincipal(), maxItems, requestedPage);
        Page<ReservationDTO> reservationsDto = this.mapToReservationDto(reservations);

        return ResponseEntity.ok().body( reservationsDto.getContent() );
    }

    @RolesAllowed("RECIPIENT")
    @GetMapping("/recipient/count")
    public ResponseEntity<?> getMyReservationsCount(
            Authentication authentication
    ){
        Long count = reservationService.getMyReservationsCount((User)authentication.getPrincipal());
        return ResponseEntity.ok().body(count);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (
            @PathVariable Long id) throws ErrandNotFoundException {
        reservationService.deleteById(id);

        return ResponseEntity.ok().body(id);

    }
    @ExceptionHandler(IllegalAccessException.class)
    private ResponseEntity<?> userNotAllowedToSaveErrand(){
        return  ResponseEntity.status(401).build();
    }


    private Page<ReservationDTO> mapToReservationDto(Page<Reservation> reservationPage){
        return
                reservationPage
                .map( reservation ->
                        ReservationDTO
                                .builder()
                                .id(reservation.getId())
                                .errandId(reservation.getId())
                                .from(reservation.getErrand().get_from())
                                .to(reservation.getErrand().get_to())
                                .meantype(reservation.getErrand().getMeantype())
                                .service(reservation.getErrand().getService())
                                .recipientEmail(reservation.getRecipient().getEmail())
                                .providerEmail(reservation.getErrand().getServiceProvider().getEmail())
                                .createdAt(reservation.getCreatedAt())
                                .build()
                );
    }
}
