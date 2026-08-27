# MongoDB Production Guide 🍃

Best practices for data modeling, indexing, aggregation, and performance optimization in MongoDB.

---

## 🎯 Key Architectural Principles

1. **Model for Access Patterns**: Design document structures based on how data is queried and updated, not just how data relates entities.
2. **Embedding vs. Referencing**: Embed data that is accessed together and does not grow unboundedly (1-to-Few). Reference data for large or unbounded sets (1-to-Many / 1-to-Squillions).
3. **Compound Index Prefixing**: Ensure queries match compound index prefixes (Equality, Sort, Range rule - ESR).
4. **Schema Validation**: Enforce JSON Schema validation on collections to ensure structural integrity across schema iterations.

---

## 💡 Best Practices

### 1. Document Schema Validation
```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "status", "createdAt"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Must be a valid email string"
        },
        status: {
          enum: ["active", "suspended", "pending"],
          description: "Must be an allowed status string"
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
});
```

### 2. Compound Indexes (ESR Rule)
1. **E**quality: fields tested with exact equality matches first.
2. **S**ort: fields used in sorting next.
3. **R**ange: fields used in range filters (`$gt`, `$lt`, `$in`) last.

```javascript
// Optimized for: db.orders.find({ status: 'completed', total: { $gt: 100 } }).sort({ createdAt: -1 })
db.orders.createIndex({ status: 1, createdAt: -1, total: 1 });
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Unbounded Arrays**: Embedding continuously growing arrays (e.g., unlimited logs or comments) causes documents to exceed the 16MB limit and forces costly document relocations.
- ❌ **Missing Write Concerns**: Writing without acknowledging (`w: 1` or `w: "majority"`) risks silent data loss during node failovers.

---

## 🔧 Recommended Tools

- **Managed Service**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **GUI Clients**: [MongoDB Compass](https://www.mongodb.com/products/compass), [Studio 3T](https://studio3t.com/)
- **ODMs**: [Mongoose](https://mongoosejs.com/) (Node.js), [Prisma](https://www.prisma.io/), [MongoEngine](http://mongoengine.org/) (Python)
