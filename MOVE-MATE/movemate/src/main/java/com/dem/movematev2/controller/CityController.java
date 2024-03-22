package com.dem.movematev2.controller;

import com.dem.movematev2.model.CityDTO;
import com.dem.movematev2.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cities")
@RequiredArgsConstructor
public class CityController {

    private final CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<CityDTO> cityList =
                Arrays.asList(
                        CityDTO.builder().name("casa").build(),
                        CityDTO.builder().name("safi").build(),
                        CityDTO.builder().name("agadir").build() );
        return ResponseEntity.ok().body(cityList);
    }

}
