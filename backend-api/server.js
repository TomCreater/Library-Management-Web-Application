const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swaggerConfig');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
