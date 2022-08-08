package com.bt.guestbook.api;

import com.bt.guestbook.model.Image;
import com.bt.guestbook.repository.ImageRepository;
import com.bt.guestbook.utils.ImageUtility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/image/upload")
    public ResponseEntity<ApiResponse> uploadImage(@RequestParam("image") MultipartFile file)
            throws IOException {
        UUID uuid = UUID.randomUUID();
        String filename = uuid + "." + FilenameUtils.getExtension(file.getOriginalFilename());

        imageRepository.save(Image.builder()
                .name(filename)
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(filename));
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