package com.job_portal.Job.Portal.api;

import com.job_portal.Job.Portal.dto.AuthDto;
import com.job_portal.Job.Portal.utility.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // For demonstration purposes, any non-null username/password is accepted.
    @PostMapping("/login")
    public AuthDto.LoginResponse login(@RequestBody AuthDto.LoginRequest loginRequest) {
        String token = jwtTokenProvider.generateToken(loginRequest.getUsername());
        return new AuthDto.LoginResponse(token);
    }
}
