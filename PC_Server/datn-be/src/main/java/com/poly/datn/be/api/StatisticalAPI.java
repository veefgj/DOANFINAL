package com.poly.datn.be.api;

import com.poly.datn.be.config.DTO.thongKeTheoNam;
import com.poly.datn.be.config.DTO.thongKeTheoNgay;
import com.poly.datn.be.config.DTO.thongKeTheoThang;
import com.poly.datn.be.config.repo.statisticalRepository;
import com.poly.datn.be.service.statisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("api/admin/statis")

public class StatisticalAPI {

    @Autowired
    statisticalService statisticalService;
    @Autowired
    statisticalRepository statisticalRepo;

    @GetMapping("thong-ke-theo-nam")
    public List<Map<String, Object>>  thongKeTheoNams(@RequestParam("year") int year ) {
        List<Map<String, Object>> results = statisticalRepo.thongKeTheoNam(year);
        for (Map<String, Object> result : results) {
            int month = (int) result.get("month");
            double monthlyRevenue = (double) result.get("monthlyRevenue");
            System.out.println("Month: " + month + ", Monthly Revenue: " + monthlyRevenue);
        }
       return results;
    }

    @GetMapping("thong-ke-theo-thang")
    public List<Map<String, Object>> thongKeTheoThangs(@RequestParam("month") int month, @RequestParam("year") int year ) {
        List<Map<String, Object>> list = statisticalRepo.thongKeTheoThang(month, year);
        return list;
    }

    @GetMapping("thong-ke-theo-ngay")
    public  List<Map<String, Object>> thongKeTheoThangs(@RequestParam("month") int month, @RequestParam("year") int year, @RequestParam("day") int day ) {
        List<Map<String, Object>> list = statisticalRepo.thongKetheoNgay(day, month, year);
        return list;
    }
}
