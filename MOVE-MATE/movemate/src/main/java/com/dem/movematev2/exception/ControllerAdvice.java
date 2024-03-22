package com.dem.movematev2.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.naming.AuthenticationException;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {


    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> authenticationException(){
        return ResponseEntity.badRequest().body("Failed to log in");
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> userNotFoundException( UserNotFoundException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(ErrandNotFoundException.class)
    public ResponseEntity<?> errandNotFoundException( ErrandNotFoundException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

}
