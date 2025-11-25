package com.QuadraBytes.Book_Fair_Reservation_System.Users.service;

import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UserRegistrationRequest;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.dto.UserResponse;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.model.User;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.repository.UserRepository;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.util.PasswordUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.QuadraBytes.Book_Fair_Reservation_System.Users.exception.DuplicateFieldException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Transactional
	public UserResponse register(UserRegistrationRequest request) {
		userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
			throw new DuplicateFieldException("email", "User already registered with this email");
		});
		userRepository.findByUsername(request.getUsername()).ifPresent(u -> {
			throw new DuplicateFieldException("username", "Username already in use");
		});

		String salt = PasswordUtil.generateSalt();
		String hash = PasswordUtil.hashPassword(request.getPassword(), salt);

		User user = new User();
		user.setEmail(request.getEmail());
		user.setUsername(request.getUsername());
		user.setPasswordHash(hash);
		user.setSalt(salt);
		user.setIsActive(true);
		user.setActiveNumberOfStalls(0);
		user.setCreatedDate(LocalDateTime.now());
		user.setModifiedDate(LocalDateTime.now());

		User saved = userRepository.save(user);
		return new UserResponse(saved.getUserId(), saved.getEmail(), saved.getUsername(), saved.getIsActive(), saved.getActiveNumberOfStalls(), saved.getCreatedDate(), saved.getModifiedDate());
	}

	// Removed listing for minimal signup scope
}
