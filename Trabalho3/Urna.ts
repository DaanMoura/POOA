export class SistemaMesario {
    private iniciaNovaVotacao() {}
}

export class Candidato {
    private numero: number
    private nome: string
    private imagem: ImageBitmap
}

export class Voto {
    private horario: Date
    private numero: number
}

export abstract class DispositivoDeRegistro {
    abstract registraVoto(voto: Voto) : void
}

export abstract class DispositivoDeExibicao {
    abstract exibeCandidatos(candidatos: Candidato[]) : void
}

export abstract class DispositivoDeExibicaoComImagem {
    abstract exibeCandidatos(candidatos: Candidato[]) : void
}

export abstract class DispositivoDeEntrada {
    abstract recebeVoto() : Voto
}

export abstract class DispositvoDeFeedback {
    abstract feedback() : void
}

export class ArmazenamentoInterno implements DispositivoDeRegistro {
    private _candidatos: Candidato[]
    private _votos: Voto[]

    constructor(candidatos: Candidato[]) {
        this._candidatos = candidatos
    }
    
    registraVoto(voto: Voto) {}

    get votos() : Voto[] { return this._votos }
    get candidatos() : Candidato[] { return this._candidatos }

}

export class ImpressoraTermica implements DispositivoDeRegistro {
    registraVoto(voto: Voto) : void {}
}

export class ServidorAuditoria implements DispositivoDeRegistro {
    registraVoto(voto: Voto) : void {}
}

export class ArmazenamentoExterno implements DispositivoDeRegistro {
    private _votos: Voto[]
    registraVoto(voto: Voto) : void {}
}

export class Tela implements DispositivoDeExibicaoComImagem, DispositvoDeFeedback {
    exibeCandidatos(candidatos: Candidato[]) {}
    feedback() {}
}

export class DisplayBraille implements DispositivoDeExibicao {
    exibeCandidatos(candidatos: Candidato[]) {}
}

export class FoneDeOuvido implements DispositivoDeExibicao {
    exibeCandidatos(candidatos: Candidato[]) {}
}

export class TecladoFisico implements DispositivoDeEntrada {
    recebeVoto() : Voto { return }
}

export class TouchScreen implements DispositivoDeEntrada {
    recebeVoto() : Voto { return }
}

export class AltoFalante implements DispositvoDeFeedback {
    feedback() {}
}

export class Urna {
    private _zonaEleitoral: string
    private _secao: String

    private armazenamento: ArmazenamentoInterno
    private mesario: SistemaMesario
    private dispositivosDeExibicao: DispositivoDeExibicao[]
    private dispositivosDeExibicaoComImagem: DispositivoDeExibicaoComImagem[]
    private dispositivosDeEntrada: DispositivoDeEntrada[]
    private dispositivosDeFeedback: DispositvoDeFeedback[]
    private dispositivosDeRegistro: DispositivoDeRegistro[]

    constructor(
        _zonaEleitoral: string, 
        _secao: String, 
        armazenamento: ArmazenamentoInterno, 
        mesario: SistemaMesario, 
        dispositivosDeExibicao: DispositivoDeExibicao[], 
        dispositivosDeExibicaoComImagem: DispositivoDeExibicaoComImagem[], 
        dispositivosDeEntrada: DispositivoDeEntrada[], 
        dispositivosDeFeedback: DispositvoDeFeedback[], 
        dispositivosDeRegistro: DispositivoDeRegistro[]
    ) {
        this._zonaEleitoral = _zonaEleitoral
        this._secao = _secao
        this.armazenamento = armazenamento
        this.mesario = mesario
        this.dispositivosDeExibicao = dispositivosDeExibicao
        this.dispositivosDeExibicaoComImagem = dispositivosDeExibicaoComImagem
        this.dispositivosDeEntrada = dispositivosDeEntrada
        this.dispositivosDeFeedback = dispositivosDeFeedback
        this.dispositivosDeRegistro = dispositivosDeRegistro
    }

    get zonaEleitoral() {
      return this._zonaEleitoral
    }
    
    get secao() {
      return this._secao
    }

    private exibeCandidatos() {
        this.dispositivosDeExibicao.forEach( dispositivo => 
            dispositivo.exibeCandidatos(this.armazenamento.candidatos))
        
        this.dispositivosDeExibicaoComImagem.forEach( dispositivo => 
            dispositivo.exibeCandidatos(this.armazenamento.candidatos))
    }

    private processaVoto(entrada: DispositivoDeEntrada) {
        const voto = entrada.recebeVoto()
        this.dispositivosDeFeedback.forEach( dispositivo => dispositivo.feedback())
        this.dispositivosDeRegistro.forEach( dispositivo => dispositivo.registraVoto(voto))
    }
}