package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.client.AdminClient;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.AdminResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.CreateStallRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.StallResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.repository.StallRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

@Service
public class StallService {

    @Autowired
    private StallRepo stallRepo;

    @Autowired
    private AdminClient adminClient;

    // Create one or many stalls by an admin
    public List<StallResponseDTO> createStalls(CreateStallRequestDTO req) {
        AdminResponseDTO admin = adminClient.getAdminById(req.getAdminId());

        List<Stall> stalls = IntStream.rangeClosed(1, req.getQuantity())
                .mapToObj(i -> {
                    Stall s = new Stall();
                    s.setType(req.getType());
                    String number = (req.getQuantity() > 1)
                            ? req.getPrefix() + "-" + i
                            : req.getStallNumber();
                    s.setStallNumber(number);
                    s.setStatus("active");
                    s.setCreatedBy(admin.getAdminname() + " (" + admin.getEmail() + ")");
                    s.setCreatedDate(LocalDateTime.now());
                    return s;
                }).toList();

        return stallRepo.saveAll(stalls).stream().map(StallResponseDTO::from).toList();
    }

    public List<StallResponseDTO> getAll() {
        return stallRepo.findAll().stream().map(StallResponseDTO::from).toList();
    }

    public Optional<StallResponseDTO> getById(UUID id) {
        return stallRepo.findById(id).map(StallResponseDTO::from);
    }

    public Optional<StallResponseDTO> update(UUID id, Stall updated) {
        return stallRepo.findById(id).map(s -> {
            s.setType(updated.getType());
            s.setStatus(updated.getStatus());
            s.setModifiedBy(updated.getModifiedBy());
            s.setModifiedDate(LocalDateTime.now());
            return StallResponseDTO.from(stallRepo.save(s));
        });
    }

    public boolean delete(UUID id) {
        if (stallRepo.existsById(id)) {
            stallRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
