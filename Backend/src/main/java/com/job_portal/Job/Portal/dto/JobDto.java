package com.job_portal.Job.Portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDto {
    private String id;
    private String title;
    private String description;
    private String location;
    private String company;
    private double salary;
}
