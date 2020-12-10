
import Api from '../../utils/request'

export const get_reserve_record = ( data ) => {
  return Api.get_reserve_records(data)
}

export const update_appointment = (data) => {
  return Api.update_appointment(data)
}
