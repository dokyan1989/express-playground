module.exports = function buildMakeBootcamp () {
  return function makeBootcamp ({
    name,
    slug,
    description,
    website,
    phone,
    email,
    address,
    location,
    careers,
    averageRating,
    averageCost,
    photo,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    userId
  } = {}) {
    return Object.freeze({
      getName: () => name,
      getSlug: () => slug,
      getDescription: () => description,
      getWebsite: () => website,
      getPhone: () => phone,
      getEmail: () => email,
      getAddress: () => address,
      getLocation: () => location,
      getCareers: () => careers,
      getAverageRating: () => averageRating,
      getAverageCost: () => averageCost,
      getPhoto: () => photo,
      getHousing: () => housing,
      getJobAssistance: () => jobAssistance,
      getJobGuarantee: () => jobGuarantee,
      getAcceptGi: () => acceptGi,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getUserId: () => userId
    });
  };
};
