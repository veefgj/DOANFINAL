package com.poly.datn.be.config.repo;

import com.poly.datn.be.config.DTO.thongKeTheoNam;
import com.poly.datn.be.config.DTO.thongKeTheoNgay;
import com.poly.datn.be.config.DTO.thongKeTheoThang;
import com.poly.datn.be.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface statisticalRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT " +
            "    a.product_id, " +
            "    p.name AS product_name, " +
            "    MAX(i.name) AS image_name, " +
            "    SUM(od.quantity) AS total_quantity " +
            "FROM " +
            "    order_detail od " +
            "    JOIN orders o ON od.order_id = o.id " +
            "    JOIN attribute a ON od.attribute_id = a.id " +
            "    JOIN products p ON a.product_id = p.id " +
            "    JOIN images i ON i.product_id = p.id " +
            "WHERE " +
            "    MONTH(o.create_date) = :month " +
            "    AND YEAR(o.create_date) = :year " +
            "GROUP BY " +
            "    a.product_id " +
            "ORDER BY " +
            "    total_quantity DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> thongKeTheoThang(@Param("month") int month, @Param("year") int year);

    @Query(value = "SELECT " +
            "    MONTH(create_date) AS month, " +
            "    SUM(total) AS monthlyRevenue " +
            "FROM " +
            "    orders o " +
            "WHERE " +
            "    YEAR(o.create_date)=:year " +
            "GROUP BY " +
            "    MONTH(o.create_date)", nativeQuery = true)
    List<Map<String, Object>> thongKeTheoNam(@Param("year") int year);

    @Query(value = "SELECT " +
            "    DAY(o.create_date) AS day, " +
            "    MONTH(o.create_date) AS month, " +
            "    YEAR(o.create_date) AS year, " +
            "    SUM(o.total) AS total_revenue " +
            "FROM " +
            "    orders o " +
            "WHERE " +
            "    DAY(o.create_date) = :day " +
            "    AND MONTH(o.create_date) = :month " +
            "    AND YEAR(o.create_date) = :year " +
            "GROUP BY " +
            "    YEAR(o.create_date), " +
            "    MONTH(o.create_date), " +
            "    DAY(o.create_date)", nativeQuery = true)
    List<Map<String, Object>> thongKetheoNgay(
            @Param("day") int day,
            @Param("month") int month,
            @Param("year") int year
    );
}
