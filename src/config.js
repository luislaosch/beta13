export default {
    // SECRET : 'secret_key_word',
    SECRET: process.env.JWT_SECRET || 'secreto_super_seguro',
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://admin:admin@hackaton17.crbbn.mongodb.net/H17',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
}