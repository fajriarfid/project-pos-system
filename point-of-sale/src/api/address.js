// Mock address data
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

// Address APIs
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
        addresses.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error("Address not found"));
      }
    }, 500);
  });
};

// Location data
const provinces = [
  { id: 1, name: "JAWA BARAT" },
  { id: 2, name: "JAWA TENGAH" },
  { id: 3, name: "DKI JAKARTA" },
];

const regencies = [
  { id: 1, provinceId: 1, name: "KOTA BANDUNG" },
  { id: 2, provinceId: 1, name: "KOTA BOGOR" },
  { id: 3, provinceId: 2, name: "KOTA SEMARANG" },
];

const districts = [
  { id: 1, regencyId: 1, name: "BOJONGKIDUL" },
  { id: 2, regencyId: 1, name: "ANDIR" },
  { id: 3, regencyId: 2, name: "BOGOR UTARA" },
];

const villages = [
  { id: 1, districtId: 1, name: "CIBEUNYING WETAN" },
  { id: 2, districtId: 1, name: "CIBEUNYING KIDUL" },
  { id: 3, districtId: 2, name: "SUKASARI" },
  { id: 4, districtId: 3, name: "TANAH BARU" },
];

// Location APIs
export const getProvinces = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(provinces), 500);
  });
};

export const getRegencies = async (provinceId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = regencies.filter((r) => r.provinceId === provinceId);
      resolve(filtered);
    }, 500);
  });
};

export const getDistricts = async (regencyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = districts.filter((d) => d.regencyId === regencyId);
      resolve(filtered);
    }, 500);
  });
};

export const getVillages = async (districtId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = villages.filter((v) => v.districtId === districtId);
      resolve(filtered);
    }, 500);
  });
};
