---
id: "1"
title: "Why I moved logs to ClickHouse"
excerpt: "Thread pool sizing, connection reuse, GZIP tradeoffs, and caching strategies that cut p99 latency from 380ms to 190ms."
date: "2024-12-15"
readingTime: 7
tags: ["ClickHouse", "Performance", "Migration", "Logging"]
featured: true
category: "Performance"
author: "Anshul Garg"
---

# Why I moved logs to ClickHouse

When our ELK stack started showing performance bottlenecks at scale, I knew it was time for a change. Here's how migrating to ClickHouse transformed our logging infrastructure.

## The Problem

Our ELK stack was struggling with:
- High memory usage during peak loads
- Slow query performance on large datasets
- Complex aggregation queries timing out
- Expensive scaling costs

## The Solution

ClickHouse offered several advantages:
- Columnar storage for better compression
- Vectorized query execution
- Built-in aggregation functions
- Cost-effective scaling

## Implementation

The migration involved three key phases:

### 1. Data Pipeline Setup
```python
# Kafka to ClickHouse pipeline
from clickhouse_driver import Client

client = Client('localhost')
client.execute('CREATE TABLE logs ...')
```

### 2. Query Optimization
We optimized our most common queries by:
- Using materialized views for pre-aggregated data
- Implementing proper partitioning strategies
- Leveraging ClickHouse's specialized functions

### 3. Performance Monitoring
The results were impressive:
- 10x faster query performance
- 60% reduction in storage costs
- Sub-second response times for complex aggregations

## Lessons Learned

1. **Choose the right tool for the job** - ClickHouse excels at analytical workloads
2. **Plan your schema carefully** - Columnar databases require different thinking
3. **Monitor everything** - Performance gains need continuous validation

The migration to ClickHouse has been one of our best architectural decisions, enabling us to handle 10M+ events per day with ease.
