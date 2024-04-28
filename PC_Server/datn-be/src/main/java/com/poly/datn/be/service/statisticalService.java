package com.poly.datn.be.service;

import com.poly.datn.be.config.DTO.thongKeTheoNam;
import com.poly.datn.be.config.DTO.thongKeTheoNgay;
import com.poly.datn.be.config.DTO.thongKeTheoThang;
import com.poly.datn.be.config.repo.statisticalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class statisticalService {
    @Autowired
    statisticalRepository statisticalRepo;

    public List<thongKeTheoNam> thongKeTheoNam(int year) {
        List<thongKeTheoNam> listProduct = statisticalRepo.thongKeTheoNam(year);
        return listProduct;
    }


    public List<thongKeTheoThang> thongKeTheoThangs(int month, int year){
        List<thongKeTheoThang> listProduct = statisticalRepo.thongKeTheoThang(month, year);
        return listProduct;
    }

    public List<thongKeTheoNgay> thongKeTheoNgays(int month, int year, int day){
        List<thongKeTheoNgay> listProduct = statisticalRepo.thongKetheoNgay(day, month, year);
        return listProduct;
    }
}
