package com.example.routemap2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MapaController {
	
	@GetMapping
	public String home() {
		return "mapa";
	}
	
}
