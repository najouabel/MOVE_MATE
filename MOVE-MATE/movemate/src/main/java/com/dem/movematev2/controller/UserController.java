package com.dem.movematev2.controller;

import com.dem.movematev2.model.UserDTO;
import com.dem.movematev2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "itemsNum", defaultValue = "10") Integer numberOfItems
    ){
        final Page<UserDTO> errandDTOList = userService.getAll(page, numberOfItems);

        return ResponseEntity.ok().body( errandDTOList.getContent() );
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(
            @PathVariable Long id ){
        final UserDTO errand = userService.getById(id);

        return ResponseEntity.ok().body(errand);
    }

}
