package br.com.synapsis.synapsis.seeders;

import br.com.synapsis.synapsis.users.UserRepository;
import br.com.synapsis.synapsis.users.UserService;
import br.com.synapsis.synapsis.users.dto.UserInputDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import java.util.Random;

@Component
@Profile("dev")
public class DatabaseSeeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final Random random = new Random();

    public DatabaseSeeder(                          UserRepository userRepository,
                          UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        seedUsers();
    }

    private void seedUsers() {
        if (userRepository.findByEmail("admin@synapsis.com").isEmpty()) {
            UserInputDTO userInputDTO = new UserInputDTO(
                    null,
                    "Administrador",
                    "admin@synapsis.com",
                    "123456"
            );
            userService.create(userInputDTO);
        }
    }
}