---
id: "5"
title: "PostgreSQL Indexing Strategies That Actually Work"
excerpt: "Composite indexes, partial indexes, and query planning for high-traffic applications."
date: "2024-08-15"
readingTime: 8
tags: ["PostgreSQL", "Database", "Performance", "Indexing"]
featured: false
category: "Database"
author: "Anshul Garg"
---

# PostgreSQL Indexing Strategies That Actually Work

Proper indexing can make or break your database performance. Here are the strategies that have worked best in production.

## Understanding Index Types

PostgreSQL offers several index types:
- B-tree (default, most common)
- Hash (equality comparisons)
- GIN (full-text search, arrays)
- GiST (geometric data, full-text)

## Composite Index Strategy

```sql
-- Instead of separate indexes
CREATE INDEX idx_user_id ON orders (user_id);
CREATE INDEX idx_status ON orders (status);

-- Use composite index
CREATE INDEX idx_user_status ON orders (user_id, status);
```

## Partial Indexes for Efficiency

```sql
-- Only index active records
CREATE INDEX idx_active_users 
ON users (email) 
WHERE status = 'active';
```

## Query Planning

Always use EXPLAIN ANALYZE:
```sql
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'pending';
```

### What the plan should look like
```text
Index Scan using idx_user_status on orders  (cost=0.42..8.53 rows=1 width=...) 
  Index Cond: ((user_id = 123) AND (status = 'pending'))
```

### Avoid the foot‑guns
- Left‑anchored predicates only use the leftmost columns in a composite index
- `ILIKE '%foo%'` needs `pg_trgm` (`gin_trgm_ops`) to be indexable
- Keep index count per table reasonable; writes degrade after ~10–15 indexes

## Results

Proper indexing strategies delivered:
- 95% reduction in query time for common operations
- Improved concurrent user capacity
- Better overall system responsiveness

Remember: Indexes speed up reads but slow down writes. Balance is key!
