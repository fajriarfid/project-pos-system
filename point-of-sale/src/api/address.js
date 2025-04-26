// Mock Address Data
const addresses = [
  {
    id: 1,
    userId: 1,
    name: "Bandung",
    detail: "Sukaraja",
    province: "JAWA BARAT",
    regency: "KOTA BANDUNG",
    district: "BOJONGKIDUL",
    village: "CIBEUNYING WETAN",
    isDefault: true,
  },
];

// Address API
export const getAddresses = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userAddresses = addresses.filter(
        (address) => address.userId === userId
      );
      resolve(userAddresses);
    }, 500);
  });
};

export const getAddressById = async (addressId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const address = addresses.find(
        (a) => a.id === Number.parseInt(addressId)
      );
      address ? resolve(address) : reject(new Error("Address not found"));
    }, 500);
  });
};

export const createAddress = async (addressData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAddress = {
        id: addresses.length + 1,
        ...addressData,
        isDefault: addresses.length === 0,
      };
      addresses.push(newAddress);
      resolve(newAddress);
    }, 500);
  });
};

export const updateAddress = async (addressId, addressData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = addresses.findIndex(
        (a) => a.id === Number.parseInt(addressId)
      );
      if (index !== -1) {
        addresses[index] = { ...addresses[index], ...addressData };
        resolve(addresses[index]);
      } else {
        reject(new Error("Address not found"));
      }
    }, 500);
  });
};

export const deleteAddress = async (addressId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = addresses.findIndex(
        (a) => a.id === Number.parseInt(addressId)
      );
      if (index !== -1) {
        const wasDefault = addresses[index].isDefault;
        addresses.splice(index, 1);

        if (wasDefault && addresses.length > 0) {
          addresses[0].isDefault = true;
        }

        resolve({ success: true });
      } else {
        reject(new Error("Address not found"));
      }
    }, 500);
  });
};

export const setDefaultAddress = async (addressId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = addresses.findIndex(
        (a) => a.id === Number.parseInt(addressId)
      );
      if (index !== -1) {
        addresses.forEach((address) => {
          address.isDefault = false;
        });
        addresses[index].isDefault = true;
        resolve(addresses[index]);
      } else {
        reject(new Error("Address not found"));
      }
    }, 500);
  });
};

const provinces = [
  { id: 1, name: "JAWA BARAT" },
  { id: 2, name: "JAWA TENGAH" },
  { id: 3, name: "DKI JAKARTA" },
  { id: 4, name: "JAWA TIMUR" },
  { id: 5, name: "BANTEN" },
];

const regencies = [
  { id: 1, provinceId: 1, name: "KOTA BANDUNG" },
  { id: 2, provinceId: 1, name: "KOTA BOGOR" },
  { id: 3, provinceId: 2, name: "KOTA SEMARANG" },
  { id: 4, provinceId: 3, name: "KOTA JAKARTA PUSAT" },
  { id: 5, provinceId: 3, name: "KOTA JAKARTA TIMUR" },
  { id: 6, provinceId: 3, name: "KOTA JAKARTA BARAT" },
  { id: 7, provinceId: 3, name: "KOTA JAKARTA SELATAN" },
  { id: 8, provinceId: 3, name: "KOTA JAKARTA UTARA" },
  { id: 9, provinceId: 4, name: "KOTA SURABAYA" },
  { id: 10, provinceId: 5, name: "KOTA TANGERANG" },
];

const districts = [
  { id: 1, regencyId: 1, name: "BOJONGKIDUL" },
  { id: 2, regencyId: 1, name: "ANDIR" },
  { id: 3, regencyId: 2, name: "BOGOR UTARA" },
  { id: 4, regencyId: 3, name: "SEMARANG TENGAH" },
  { id: 5, regencyId: 4, name: "MENTENG" },
  { id: 6, regencyId: 5, name: "DUREN SAWIT" },
  { id: 7, regencyId: 6, name: "KEMBANGAN" },
  { id: 8, regencyId: 7, name: "KEBAYORAN BARU" },
  { id: 9, regencyId: 8, name: "PENJARINGAN" },
  { id: 10, regencyId: 9, name: "SURABAYA PUSAT" },
  { id: 11, regencyId: 10, name: "TANGERANG KOTA" },
];

const villages = [
  { id: 1, districtId: 1, name: "CIBEUNYING WETAN" },
  { id: 2, districtId: 1, name: "CIBEUNYING KIDUL" },
  { id: 3, districtId: 2, name: "SUKASARI" },
  { id: 4, districtId: 3, name: "TANAH BARU" },
  { id: 5, districtId: 4, name: "SEMARANG TENGAH" },
  { id: 6, districtId: 5, name: "KEBON SIRIH" },
  { id: 7, districtId: 6, name: "KLENDER" },
  { id: 8, districtId: 7, name: "MERUYA" },
  { id: 9, districtId: 8, name: "SENAYAN" },
  { id: 10, districtId: 9, name: "PLUIT" },
  { id: 11, districtId: 10, name: "GENTENG" },
  { id: 12, districtId: 11, name: "SUKASARI" },
];

// Location API
export const getProvinces = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(provinces), 500);
  });
};

export const getRegencies = async (provinceName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const province = provinces.find((p) => p.name === provinceName);
      const filtered = regencies.filter((r) => r.provinceId === province?.id);
      resolve(filtered);
    }, 500);
  });
};

export const getDistricts = async (regencyName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const regency = regencies.find((r) => r.name === regencyName);
      const filtered = districts.filter((d) => d.regencyId === regency?.id);
      resolve(filtered);
    }, 500);
  });
};

export const getVillages = async (districtName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const district = districts.find((d) => d.name === districtName);
      const filtered = villages.filter((v) => v.districtId === district?.id);
      resolve(filtered);
    }, 500);
  });
};

// Shipping Cost Function
export const getShippingCost = (regency) => {
  console.log("Calculating shipping cost for regency:", regency);

  const shippingRates = {
    "KOTA BANDUNG": 10000,
    "KOTA BOGOR": 15000,
    "KOTA SEMARANG": 20000,
    "KOTA JAKARTA PUSAT": 12000,
    "KOTA JAKARTA TIMUR": 13000,
    "KOTA JAKARTA BARAT": 14000,
    "KOTA JAKARTA SELATAN": 15000,
    "KOTA JAKARTA UTARA": 16000,
    "KOTA SURABAYA": 30000,
    "KOTA TANGERANG": 18000,
  };

  const cost = shippingRates[regency] || 25000; // Default cost if regency not found
  console.log("Shipping cost calculated:", cost);
  return cost;
};

export default {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getShippingCost,
};
