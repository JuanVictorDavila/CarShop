// import { expect } from 'chai';
// import mongoose from 'mongoose';

import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import * as CarService from '../../../services/CarService';
import { mockCarModel, mockCarSave, mockCarSaveUpdated, mock_id } from '../mockCars';

describe('Testando a camada service de Car', () => {
  describe('Criação de carros', () => {
    before(() => {
      sinon
        .stub(Model, 'create')
          .resolves(mockCarSave);
    });

    after(() => {
      (Model.create as SinonStub).restore();
    });

    it('Carro criado com sucesso', async () => {
      const result = await CarService.createCar(mockCarModel);
      expect(result).to.be.deep.equal(mockCarSave);
    });
  });

  describe('Atualizando dados de carro já criado', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCarSave);
      sinon.stub(Model, 'findById').resolves(mockCarSaveUpdated);
    });

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore();
      (Model.findById as SinonStub).restore();
    });

    it('Carro é atualizado com sucesso', async () => {
      const result = await CarService.updateCar(mock_id, mockCarSaveUpdated);

      expect(result).to.be.deep.equal(mockCarSave);
    });
  });

  describe('Deletando carro por id', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(1);
    });

    
    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();
    });

    it('Deletando carro', async () => {
      const result = await CarService.deleteCar(mock_id);

      expect(result).to.be.deep.equal(1);
    });
  });
});