// template para criação dos testes de cobertura da camada de controller

import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import * as CarController from '../../../controllers/CarController';
import { mockCarModel, mockCarFind, mock_id } from '../mockCars';

describe('Testando a camada controller de Car', () => {
  describe('Criação de carros', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = mockCarModel;
    });

    it('Carro criado com sucesso', async () => {
      
      await CarController.createCar(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.false;
      expect((res.json as sinon.SinonStub).calledWith(mockCarModel)).to.be.false;
    });
  })

  describe('Buscando carro registrado pelo ID', () => {
    const req = {} as Request;
    const res = {} as Response;
    req.params = {id: mock_id};

    before(() => {
        sinon.stub(Model, 'find').resolves(mockCarFind);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
    });

    after(() => {
        (Model.find as sinon.SinonStub).restore();
    });

    it('Retorna carro com id especificado', async () => {
        req.body = mockCarModel;

        await CarController.findByIdCar(req, res);
        await CarController.deleteCar(req, res);
        await CarController.updateCar(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).equal(false);
        expect((res.json as sinon.SinonStub).calledWith(mockCarFind)).equal(false);
    });
});
});
