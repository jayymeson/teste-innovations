import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IbgeService {
  async findAll() {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`,
    );

    console.log(response);
    return JSON.stringify(response);
  }

  async findOne(uf: string) {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`,
    );

    return response;
  }
}
