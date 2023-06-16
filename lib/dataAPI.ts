export const chargeData = async () => {
  const res = await fetch("/api/db_managment", {
    method: "GET",
  })
  return res.json()
}
