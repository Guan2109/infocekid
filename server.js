const express = require('express');
const fetch = require('node-fetch'); // pastikan node-fetch@2
const app = express();

const PORT = 3000;
const RAJAONGKIR_API_KEY = 'MASUKIN_API_KEY_KAMU_DI_SINI';

// supaya bisa menerima data json dari client
app.use(express.json());
app.use(express.static('public')); // kalau mau frontend simpan di folder public

// endpoint cek resi
app.post('/cekresi', async (req, res) => {
  const { courier, waybill } = req.body;

  if (!courier || !waybill) {
    return res.status(400).json({ error: 'courier dan waybill wajib diisi' });
  }

  try {
    const response = await fetch('https://api.rajaongkir.com/starter/waybill', {
      method: 'POST',
      headers: {
        'key': PCRVugDy921e93219a74c87ae0Lhg5lB,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        waybill: waybill,
        courier: courier,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Gagal memanggil API RajaOngkir' });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
