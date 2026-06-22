import axiosClient from "../../shared/api/axiosClient"

export const analyzeContract = (contractText) =>
  axiosClient.post("/analysis/", { contract_text: contractText }).then(r => r.data)