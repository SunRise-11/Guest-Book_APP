package com.bt.guestbook.api;

import com.bt.guestbook.model.Image;
import com.bt.guestbook.repository.ImageRepository;
import com.bt.guestbook.utils.ImageUtility;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/image/upload")
    public void uploadImage(@RequestParam("image") MultipartFile file, HttpServletResponse response) throws IOException {
        UUID uuid = UUID.randomUUID();
        String filename = uuid.toString();

        imageRepository.save(Image.builder()
                .name(filename)
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/image/upload").toUriString());


        Map<String, String> res = new HashMap<>();
        res.put("file", filename);

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), res);
    }

    @GetMapping(path = {"/image/get/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        if (dbImage.isPresent()) {
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(dbImage.get().getType()))
                    .body(ImageUtility.decompressImage(dbImage.get().getImage()));
        }

        throw new IOException("no image found");
    }
}