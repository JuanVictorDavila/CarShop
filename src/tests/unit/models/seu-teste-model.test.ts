// import { expect } from 'chai';
// import mongoose from 'mongoose';

import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import * as CarService from '../../../services/CarService';
import { mockCarModel, mockCarSave, mockCarSaveUpdated, mock_id } from '../mockCars';

describe('Testando a camada model de Car', () => {
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

  describe('Busca de todos os carros registrados', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mockCarSave]);
    });

    after(() => {
      (Model.find as SinonStub).restore();
    });

    it('Retorna todos os carros', async () => {
      const result = await CarService.findCar();
      expect(result).to.be.deep.equal([mockCarSave]);
    });
  });

  describe('Buscando carro registrado pelo ID', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mockCarSave]);
    });
    
    after(() => {
      (Model.findOne as SinonStub).restore();
    });
    
    it('Retorna carro com id especificado', async () => {
      sinon.stub(Model, 'findOne').resolves(mockCarSave);
      const result = await CarService.findByIdCar(mock_id);

      expect(result).to.be.deep.equal(mockCarSave);
    });

    it('Retorna erro se não achar ID de Car', async () => {
      (Model.findOne as SinonStub).restore();
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        await CarService.findByIdCar(mock_id);
        expect.fail();
      } catch (e) {
        expect((e as Error).message).to.be.equal('Object not found');
      }
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