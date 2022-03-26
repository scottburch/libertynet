import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
import chai, {expect} from "chai";
import {foo, Logger} from './temp'

chai.use(sinonChai)

describe('foo', () => {
    it('should work', () => {
        const logger = {log: sinon.spy()} as Logger
        foo(logger);
        expect(logger.log).to.have.been.calledOnceWith('')
    })
})