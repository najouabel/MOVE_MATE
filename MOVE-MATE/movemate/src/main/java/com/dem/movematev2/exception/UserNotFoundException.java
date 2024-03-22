package com.dem.movematev2.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(final String msg) {
        super(msg);
    }

}
