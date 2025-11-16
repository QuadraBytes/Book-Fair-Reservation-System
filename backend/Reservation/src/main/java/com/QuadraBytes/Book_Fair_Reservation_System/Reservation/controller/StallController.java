package com.QuadraBytes.Book_Fair_Reservation_System.Reservation.controller;

import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.CreateStallRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.StallResponseDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.dto.UpdateStallRequestDTO;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.model.Stall;
import com.QuadraBytes.Book_Fair_Reservation_System.Reservation.service.StallService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    private final StallService stallService;

    public StallController(StallService stallService) {
        this.stallService = stallService;
    }

    // 🧩 Create (single or multiple)
    @PostMapping
    public ResponseEntity<List<StallResponseDTO>> create(@Valid @RequestBody CreateStallRequestDTO req) {
        List<StallResponseDTO> created = stallService.createStalls(req);
        return ResponseEntity.created(URI.create("/api/stalls")).body(created);
    }

    // 🔍 Get all
    @GetMapping
    public ResponseEntity<List<StallResponseDTO>> getAll() {
        return ResponseEntity.ok(stallService.getAll());
    }

    // 🔍 Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<StallResponseDTO> getById(@PathVariable UUID id) {
        return stallService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✏️ Update
    @PutMapping("/{id}")
    public ResponseEntity<StallResponseDTO> update(@PathVariable UUID id,
                                                   @RequestBody UpdateStallRequestDTO req) {
        return stallService.update(id, req.toEntity())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ❌ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        boolean deleted = stallService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
