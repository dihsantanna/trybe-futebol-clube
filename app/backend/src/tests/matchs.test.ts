import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Matchs from '../database/models/matchs';
import * as Mock from './mock';
import { StatusCode as code, msgs } from '../environments';
import { getChaiHttpResponse } from './helpers';
import { MatchsBody as body } from './utils';

const matchsResponseSuccess = Mock.MatchsMock;

const matchsInProgressResponse = Mock.MatchsMock.filter((m) => m.inProgress);

const matchsFinishedResponse = Mock.MatchsMock.filter((m) => !m.inProgress);

const matchsCreatedInProgress = {
  id: 1,
  ...body.createdInProgress,
};

const matchsCreatedFinished = {
  id: 1,
  ...body.createdFinished,
};

import { Response } from 'superagent';
import Clubs from '../database/models/clubs';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa o endpoint GET /matchs', () => {
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(Mock.MatchsMock as unknown as Matchs[])

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/matchs',
      '',
    );
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  });

  it('verifica se retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it('verifica se retorna array com todas as partidas', () => {
    expect(chaiHttpResponse.body).to.be.deep.equal(matchsResponseSuccess)
  });

});

describe('Testa o endpoint GET /matchs?inProgress=bool', () => {
  describe('passado "inProgress=true"', () => {
    before(async () => {
      sinon
        .stub(Matchs, 'findAll')
        .resolves(matchsInProgressResponse as unknown as Matchs[]);

      chaiHttpResponse = await getChaiHttpResponse(
        'GET',
        '/matchs?inProgress=true',
        '',
      );
    });

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    })

    it('verifica se retorna status code 200', () => {
      expect(chaiHttpResponse).to.have.status(code.OK);
    });

    it('verifica se retorna um array com as partidas em progresso', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(matchsInProgressResponse);
    });

  });

  describe('passado "inProgress=false"', () => {
    before(async () => {
      sinon
        .stub(Matchs, 'findAll')
        .resolves(matchsFinishedResponse as unknown as Matchs[]);

      chaiHttpResponse = await getChaiHttpResponse(
        'GET',
        '/matchs?inProgress=false',
        '',
      );
    });

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    })

    it('verifica se retorna status code 200', () => {
      expect(chaiHttpResponse).to.have.status(code.OK);
    });

    it('verifica se retorna um array com as partidas em progresso', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(matchsFinishedResponse);
    });

  });

});

describe('Testa endpoint POST /matchs', () => {
  let clubsMock:Clubs[];
  describe('Passados token e dados validos testa a criação de nova partida "em progresso"', () => {
    const { createdInProgress } = body;

    clubsMock = Mock.ClubsMock
      .filter((club) => club.id === createdInProgress.homeTeam
        || club.id === createdInProgress.awayTeam) as Clubs[];
    
    before(async () => {
      sinon
        .stub(Matchs, 'create')
        .resolves(matchsCreatedInProgress as unknown as Matchs);

      sinon
        .stub(Clubs, 'findAndCountAll')
        .resolves({ count: 2, rows: clubsMock});

      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/matchs',
        createdInProgress,
        Mock.token,
      );
    });

    after(() => {
      (Matchs.create as sinon.SinonStub).restore();
      (Clubs.findAndCountAll as sinon.SinonStub).restore();
    });

    it('retorna status code 201', () => {
      expect(chaiHttpResponse).to.have.status(code.CREATED);
    });

    it('retorna no body um objeto da partida criada', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(matchsCreatedInProgress);
    });

  });

  describe('Passados token e dados validos testa a criação de nova partida "finalizada"', () => {
    const { createdFinished } = body;

    clubsMock = Mock.ClubsMock
      .filter((club) => club.id === createdFinished.homeTeam
        || club.id === createdFinished.awayTeam) as Clubs[];

    before(async () => {
      sinon
        .stub(Matchs, 'create')
        .resolves(matchsCreatedFinished as unknown as Matchs);

      sinon
      .stub(Clubs, 'findAndCountAll')
      .resolves({ count: 2, rows: clubsMock});

      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/matchs',
        createdFinished,
        Mock.token,
      );
    });

    after(() => {
      (Matchs.create as sinon.SinonStub).restore();
      (Clubs.findAndCountAll as sinon.SinonStub).restore();
    });

    it('retorna status code 201', () => {
      expect(chaiHttpResponse).to.have.status(code.CREATED);
    });

    it('retorna no body um objeto da partida criada', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(matchsCreatedFinished);
    });

  });

  describe('Passados token ou dados inválidos testa se é retornado uma mensagem de erro', () => {
    describe('Não passando o token no header "Authorization"', () => {
      before(async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.createdInProgress,
        );
      });

      it('retorna status code 401', () => {
        expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      });

      it('retorna a mensagem "Token is required"', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TOKEN_REQUIRED);
      });

    });

    describe('Passando token inválido no header "Authorization"', () => {
      before(async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.createdInProgress,
          'token_inválido'
        );
      });

      it('retorna status code 401', () => {
        expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      });

      it('retorna a mensagem "Invalid token"', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TOKEN_INVALID);
      });

    });

    describe('Na ausência de algum campo, retorna status 400 com a mensagem "All fields are required"', () => {

      it('não é passado campo "homeTeam"', async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.withoutHomeTeam,
          Mock.token,
        )

        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.ALL_FIELD_REQUIRED);
      });

      it('não é passado campo "homeTeamGoals"', async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.withoutHomeTeamGoals,
          Mock.token,
        )

        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.ALL_FIELD_REQUIRED);
      });

      it('não é passado campo "awayTeam"', async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.withoutAwayTeam,
          Mock.token,
        )

        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.ALL_FIELD_REQUIRED);
      });

      it('não é passado campo "awayTeamGoals"', async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.withoutAwayTeamGoals,
          Mock.token,
        )

        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.ALL_FIELD_REQUIRED);
      });

      it('não é passado campo "inProgress"', async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.withoutInProgress,
          Mock.token,
        )

        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.ALL_FIELD_REQUIRED);
      });

    });

    describe('Caso seja passado times iguais', () => {
      before(async () => {
        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          body.equalTeams,
          Mock.token,
        );

      });

      it('retorna status code 400', () => {
        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
      });

      it('retorna a mensagem de erro "It is not possible to create a match with two equal teams" no body', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.EQUAL_TEAMS);
      });

    });

    describe('Caso seja passado um time inexistente em "homeTeam"', () => {
      const { noExistentHomeTeam } = body;

      clubsMock = Mock.ClubsMock
        .filter((club) => club.id === noExistentHomeTeam.homeTeam
          || club.id === noExistentHomeTeam.awayTeam) as Clubs[];

      before(async () => {
        sinon
          .stub(Clubs, 'findAndCountAll')
          .resolves({ count: 1, rows: clubsMock});

        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          noExistentHomeTeam,
          Mock.token,
        );

      });

      after(() => {
        (Clubs.findAndCountAll as sinon.SinonStub).restore();
      });

      it('retorna status code 400', () => {
        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
      });

      it('retorna a mensagem de erro "Team not found" no body', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TEAM_NOT_FOUND);
      });

    });

    describe('Caso seja passado um time inexistente em "awayTeam"', () => {
      const { noExistentAwayTeam } = body;

      clubsMock = Mock.ClubsMock
        .filter((club) => club.id === noExistentAwayTeam.homeTeam
          || club.id === noExistentAwayTeam.awayTeam) as Clubs[];

      before(async () => {
        sinon
          .stub(Clubs, 'findAndCountAll')
          .resolves({ count: 1, rows: clubsMock});

        chaiHttpResponse = await getChaiHttpResponse(
          'POST',
          '/matchs',
          noExistentAwayTeam,
          Mock.token,
        );

      });

      after(() => {
        (Clubs.findAndCountAll as sinon.SinonStub).restore();
      });

      it('retorna status code 400', () => {
        expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
      });

      it('retorna a mensagem de erro "Team not found" no body', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TEAM_NOT_FOUND);
      });

    });

  });

});

describe('Testa o endpoint PATCH /matchs/:id/finish', () => {
  describe('Ao passar um id válido é possível salvar status "inProgress" como "false"', () => {
    before(async () => {
      sinon
        .stub(Matchs, 'update')
        .resolves([1] as unknown as [number , Matchs[]]);
    })
    it('não é possível atualizar partida passando token invalido', async () => {
      chaiHttpResponse = await getChaiHttpResponse(
        'PATCH',
        '/matchs/:3/finish',
        '',
        'token_invalido',
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TOKEN_INVALID);
    });

    it('ao atualizar partida com sucesso retorna status 200', async () => {
      chaiHttpResponse = await getChaiHttpResponse(
        'PATCH',
        '/matchs/:3/finish',
        '',
        Mock.token,
      );

      expect(chaiHttpResponse).to.have.status(code.OK);
    });
    
  });

  describe('Ao passar um id inválido', () => {
    before(async () => {
      sinon
        .stub(Matchs, 'update')
        .resolves([0] as unknown as [number , Matchs[]]);

      chaiHttpResponse = await getChaiHttpResponse(
        'PATCH',
        '/matchs/:999/finish',
        '',
        Mock.token,
      );
    });

    it('retorna status 400', async () => {
      expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
    });
    
  });

});
