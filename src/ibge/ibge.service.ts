import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IbgeService {
  async findAll() {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`,
    );
    console.log(response);
    return response.data;
  }

  async findOne(uf: string) {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
