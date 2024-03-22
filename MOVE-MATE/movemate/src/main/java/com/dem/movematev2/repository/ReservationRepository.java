package com.dem.movematev2.repository;

import com.dem.movematev2.model.entity.Recipient;
import com.dem.movematev2.model.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Page<Reservation> findAllByRecipient(Recipient recipient, Pageable pageable);
    Long countReservationByRecipient(Recipient recipient);
}
