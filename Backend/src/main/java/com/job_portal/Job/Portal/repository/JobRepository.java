package com.job_portal.Job.Portal.repository;

import com.job_portal.Job.Portal.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface JobRepository extends MongoRepository<Job, String> {
    // Custom query: find jobs where the title contains (ignoring case) a keyword
    List<Job> findByTitleContainingIgnoreCase(String title);
}
