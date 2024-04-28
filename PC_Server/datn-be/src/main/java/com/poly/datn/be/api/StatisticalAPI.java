package com.poly.datn.be.api;

import com.poly.datn.be.config.DTO.thongKeTheoNam;
import com.poly.datn.be.config.DTO.thongKeTheoNgay;
import com.poly.datn.be.config.DTO.thongKeTheoThang;
import com.poly.datn.be.service.statisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("api/admin/statis")
public class StatisticalAPI {

    @Autowired
    statisticalService statisticalService;

    @GetMapping("thong-ke-theo-nam")
    public List<thongKeTheoNam> thongKeTheoNams(@RequestParam("year") int year ) {
        List<thongKeTheoNam> list = statisticalService.thongKeTheoNam(year);
        return list;
    }

    @GetMapping("thong-ke-theo-thang")
    public List<thongKeTheoThang> thongKeTheoThangs(@RequestParam("month") int month, @RequestParam("year") int year ) {
        List<thongKeTheoThang> list = statisticalService.thongKeTheoThangs(month, year);
        return list;
    }

    @GetMapping("thong-ke-theo-ngay")
    public List<thongKeTheoNgay> thongKeTheoThangs(@RequestParam("month") int month, @RequestParam("year") int year, @RequestParam("day") int day ) {
        List<thongKeTheoNgay> list = statisticalService.thongKeTheoNgays(month, year, day);
        return list;
    }
}
