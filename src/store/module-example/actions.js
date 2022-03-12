export async function getProvince({ getters, commit }) {
  const response = await fetch(getters.getUrlLink + "/provinces.json");
  const opt_province = await response.json();

  let prov_option = [];
  for (let i = 0; i < opt_province.length; i++) {
    prov_option.push({
      id: opt_province[i].id,
      label: opt_province[i].name,
    })
  }

  commit('mutateProvince', prov_option);
}

export async function getRegency({ getters, commit }, id) {
  const response = await fetch(getters.getUrlLink + `/regencies/${id}.json`);
  const opt_regency = await response.json();

  let reg_option = [];
  for (let i = 0; i < opt_regency.length; i++) {
    reg_option.push({
      id: opt_regency[i].id,
      label: opt_regency[i].name,
    });
  }

  commit('mutateRegency', reg_option);
}

export async function getDistrict({ getters, commit }, id) {
  const response = await fetch(getters.getUrlLink + `/districts/${id}.json`);
  const opt_district = await response.json();

  let dis_option = [];
  for (let i = 0; i < opt_district.length; i++) {
    dis_option.push({
      id: opt_district[i].id,
      label: opt_district[i].name,
    });
  }

  commit('mutateDistrict', dis_option);
}

export async function getVillage({ getters, commit }, id) {
  const response = await fetch(getters.getUrlLink + `/villages/${id}.json`);
  const opt_village = await response.json();

  let vil_option = [];
  for (let i = 0; i < opt_village.length; i++) {
    vil_option.push({
      id: opt_village[i].id,
      label: opt_village[i].name,
    });
  }

  commit('mutateVillage', vil_option);
}
