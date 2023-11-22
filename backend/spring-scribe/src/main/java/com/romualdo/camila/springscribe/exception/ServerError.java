package com.romualdo.camila.springscribe.exception;

public class ServerError extends RuntimeException {
    public ServerError(String message) {
        super(message);
    }
}
