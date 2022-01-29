package com.main.server.exception;

public class ResourceAlreadyExist extends Exception{
    public ResourceAlreadyExist() {
        super();
    }

    public ResourceAlreadyExist(String message) {
        super(message);
    }
}
