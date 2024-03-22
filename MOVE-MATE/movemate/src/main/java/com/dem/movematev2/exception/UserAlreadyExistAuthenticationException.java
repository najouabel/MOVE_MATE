package com.dem.movematev2.exception;

public class UserAlreadyExistAuthenticationException extends RuntimeException {

    public UserAlreadyExistAuthenticationException(final String msg) {
        super(msg);
    }

}
