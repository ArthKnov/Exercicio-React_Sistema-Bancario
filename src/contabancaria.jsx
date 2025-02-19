import { useState } from "react";
import Swal from "sweetalert2";

function ContaBancaria({ numero, agNumero, agNome, tipo }) {
  const [saldo, setSaldo] = useState(0);
  const [estadoConta, setEstadoConta] = useState(tipo);

  const creditar = async () => {
    if (estadoConta === 4) {
      Swal.fire("Erro", "Conta encerrada. Não é possível realizar essa operação.", "error");
      return;
    }
    const { value: valor } = await Swal.fire({
      title: "Valor para creditar:",
      input: "number",
      inputAttributes: { min: 0.01, step: 0.01 },
      showCancelButton: true,
    });
    if (!valor || valor <= 0) {
      Swal.fire("Erro", "Valor inválido. Tente novamente.", "error");
      return;
    }
    setSaldo(prevSaldo => prevSaldo + parseFloat(valor));
  };

  const debitar = async () => {
    if (estadoConta === 4) {
      Swal.fire("Erro", "Conta encerrada. Não é possível realizar essa operação.", "error");
      return;
    }
    const { value: valor } = await Swal.fire({
      title: "Valor para debitar:",
      input: "number",
      inputAttributes: { min: 0.01, step: 0.01 },
      showCancelButton: true,
    });
    if (!valor || valor <= 0) {
      Swal.fire("Erro", "Valor inválido. Tente novamente.", "error");
      return;
    }
    setSaldo(prevSaldo => {
      if (prevSaldo - valor < 0) {
        Swal.fire("Erro", "Saldo insuficiente!", "error");
        return prevSaldo;
      }
      return prevSaldo - parseFloat(valor);
    });
  };

  const consultarSaldo = () => {
    Swal.fire("Saldo Atual", `Saldo atual: R$ ${saldo.toFixed(2)}`, "info");
  };

  const encerrarConta = () => {
    if (saldo < 0) {
      Swal.fire("Erro", "Não é possível encerrar a conta com saldo negativo.", "error");
      return;
    }
    setEstadoConta(4);
    Swal.fire("Conta Encerrada", `Conta encerrada! Saldo final: R$ ${saldo.toFixed(2)}`, "success");
  };

  const reabrirConta = async () => {
    if (estadoConta !== 4) {
      Swal.fire("Erro", "A conta já está ativa.", "error");
      return;
    }
    const { value: novoTipo } = await Swal.fire({
      title: "Digite o tipo: 1 (Corrente) ou 2 (Poupança)",
      input: "number",
      inputAttributes: { min: 1, max: 2, step: 1 },
      showCancelButton: true,
    });
    if (![1, 2].includes(parseInt(novoTipo, 10))) {
      Swal.fire("Erro", "Tipo de conta inválido. Use 1 (corrente) ou 2 (poupança).", "error");
      return;
    }
    setEstadoConta(parseInt(novoTipo, 10));
    Swal.fire("Conta Reativada", `Conta reativada como tipo ${novoTipo}`, "success");
  };

  return (
    <div className="container">
      <h2>Conta Bancária</h2>
      <p><strong>Número:</strong> {numero}</p>
      <p><strong>Agência:</strong> {agNome} - {agNumero}</p>
      <p><strong>Tipo:</strong> {estadoConta === 1 ? "Corrente" : estadoConta === 2 ? "Poupança" : "Encerrada"}</p>
      <p><strong>Saldo:</strong> R$ {saldo.toFixed(2)}</p>

      <button onClick={creditar}>Creditar</button>
      <button onClick={debitar}>Debitar</button>
      <button onClick={consultarSaldo}>Consultar Saldo</button>
      <button onClick={encerrarConta}>Encerrar Conta</button>
      <button onClick={reabrirConta}>Reabrir Conta</button>
    </div>
  );
}

export default ContaBancaria;
