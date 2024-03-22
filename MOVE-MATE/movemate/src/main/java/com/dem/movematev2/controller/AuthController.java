package com.dem.movematev2.controller;


import com.google.gson.Gson;
import com.dem.movematev2.exception.UserAlreadyExistAuthenticationException;
import com.dem.movematev2.model.AuthRequest;
import com.dem.movematev2.model.SignupRequest;
import com.dem.movematev2.model.entity.User;
import com.dem.movematev2.service.UserService;
import com.dem.movematev2.util.JwtHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtHandler jwtHandler;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest authRequest) throws JSONException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.email(),
                        authRequest.password()));
        final User user = (User) authentication.getPrincipal();

        if (user != null) {
            String jwt = jwtHandler.generateToken(user);
            final Gson gson = new Gson();
            return ResponseEntity.ok().body(gson.toJson(jwt));
        }

        System.out.println(" after user not null ");
        return ResponseEntity.status(401).build();
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            User user = userService.addUser(signupRequest);
            String jwt = jwtHandler.generateToken(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                    .body("User registered successfully");
        } catch (UserAlreadyExistAuthenticationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists");
        }
    }




    @ExceptionHandler(UserAlreadyExistAuthenticationException.class)
    public ResponseEntity<?> userAlreadyExists(){
        return ResponseEntity.status(403).build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> illegateArgument(){
        return ResponseEntity.status(401).build();
    }

}
