import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';
import { useSwipeable } from 'react-swipeable';
import './CasaNova.css';
import { isMobile } from 'react-device-detect';

interface Item {
  id: number;
  name: string;
  price: number;
  img: string;
  purchased: boolean;
  quantity: number;
}

interface CasaNovaProps {
  isMobile: boolean;
}

const NewHomeGiftPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(6);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const sortByCheapest = () => {
    const sortedItems = [...items].sort((a, b) => a.price - b.price);
    setItems(sortedItems);
  };

  const generatePixPayload = (
    amount: number,
    pixKey: string,
    merchantName: string,
    merchantCity: string
  ): string => {
    const formatField = (id: string, value: string): string =>
      `${id}${value.length.toString().padStart(2, '0')}${value}`;
    const payload = [
      formatField('00', '01'),
      formatField(
        '26',
        formatField('00', 'BR.GOV.BCB.PIX') +
          formatField('01', pixKey)
      ),
      formatField('52', '0000'),
      formatField('53', '986'),
      formatField('54', amount.toFixed(2)),
      formatField('58', 'BR'),
      formatField('59', merchantName),
      formatField('60', merchantCity),
      formatField('62', formatField('05', 'evHhFaTSaG')),
    ];
    const payloadWithoutCRC = payload.join('');
    return `${payloadWithoutCRC}6304${calculateCRC16(payloadWithoutCRC + '6304')}`;
  };

  const calculateCRC16 = (payload: string): string => {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  };

  const fetchItems = async (page: number) => {
    try {
      setLoading(true);
      const skip = page * itemsPerPage;
      const response = await fetch(
        `https://casa-nova-api.vercel.app/casa?skip=${skip}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar os itens.");
      }
      const data: any[] = await response.json();
  
      const transformedItems: Item[] = await Promise.all(
        data.map(async (item) => {
          const img = new Image();
          img.src = item.imagem || "https://via.placeholder.com/150";
  
          // Aguarda o processamento da transparência
          const processedImg = await makeWhiteTransparent(img);
  
          return {
            id: item.id,
            name: item.item_nome,
            price: parseFloat(item.preco),
            img: processedImg, // Usa a imagem processada
            purchased: !!item.nome_pessoa,
            quantity: parseInt(item.quantidade, 10),
          };
        })
      );
  
      setItems(transformedItems);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const handleShowPayment = (item: Item) => {
    const payload = generatePixPayload(
      item.price,
      '61070800317',
      'Mateus Cardoso Cabral',
      'SAO PAULO'
    );
    setPixCode(payload);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setPixCode(null);
  };

  const handleSwipe = async (direction: "up" | "down") => {
    if (transitioning) return;

    const nextPage =
      direction === "up"
        ? Math.min(currentPage + 1, items.length - 1)
        : Math.max(currentPage - 1, 0);

    if (nextPage !== currentPage) {
      setTransitioning(true);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simula o tempo de transição
      setCurrentPage(nextPage);
      setTransitioning(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    preventScrollOnSwipe: true,
  });

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && items.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const makeWhiteTransparent = (img: HTMLImageElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!img.complete || img.naturalWidth === 0) {
        // Aguarda o carregamento da imagem
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
  
            if (!context) {
              resolve(img.src); // Retorna a imagem original caso o contexto seja inválido
              return;
            }
  
            // Ajusta o tamanho do canvas para o tamanho da imagem
            canvas.width = img.width;
            canvas.height = img.height;
  
            // Desenha a imagem no canvas
            context.drawImage(img, 0, 0);
  
            // Obtém os dados de pixels
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
  
            // Substitui o branco (255, 255, 255) por transparência
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
  
              if (r === 255 && g === 255 && b === 255) {
                data[i + 3] = 0; // Define alpha para 0 (transparente)
              }
            }
  
            // Atualiza os dados do canvas
            context.putImageData(imageData, 0, 0);
  
            // Retorna a imagem processada como uma URL de dados
            resolve(canvas.toDataURL());
          } catch (error) {
            reject(error);
          }
        };
  
        img.onerror = () => {
          reject(new Error("Falha ao carregar a imagem."));
        };
      } else {
        // Processa a imagem imediatamente se já estiver carregada
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
  
        if (!context) {
          resolve(img.src); // Retorna a imagem original caso o contexto seja inválido
          return;
        }
  
        canvas.width = img.width;
        canvas.height = img.height;
  
        context.drawImage(img, 0, 0);
  
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
  
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
  
          if (r === 255 && g === 255 && b === 255) {
            data[i + 3] = 0;
          }
        }
  
        context.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      }
    });
  };
  
  

  return (
    <div className="loading-container">
      {loading ? (
        <div className="loading-wrapper">Carregando...</div>
      ) : error ? (
        <div className="error-container">Erro: {error}</div>
      ) : (
        <>
          {/* Botão de Ordenação */}
          <div className="sort-button-container">
            <button className="luxury-button" onClick={sortByCheapest}>
              ✨ Mostrar Mais Baratos ✨
            </button>
          </div>
  
          {/* Condicional para Mobile e Desktop */}
          {isMobile ? (
            // Modo Mobile: Swipeable Item com animações estilo TikTok
            <div {...swipeHandlers} className="mobile-swipe-container">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`swipe-item ${
                    index === currentPage
                      ? "active"
                      : index === currentPage - 1
                      ? "previous"
                      : index === currentPage + 1
                      ? "next"
                      : "hidden"
                  }`}
                  style={{
                    transform:
                      index === currentPage
                        ? "translateY(0)"
                        : index < currentPage
                        ? "translateY(-100%)"
                        : "translateY(100%)",
                    transition: transitioning ? "transform 0.3s ease-in-out" : "none",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <h5>{item.name}</h5>
                  <p>R$ {item.price.toFixed(2).replace(".", ",")}</p>
                  <button
                    className={`btn ${
                      item.purchased ? "btn-success" : "btn-primary"
                    }`}
                    onClick={() => handleShowPayment(item)}
                  >
                    {item.purchased ? "Comprado ✔️" : "Pagar"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // Modo Desktop: Grid de Itens
            <div className="container mt-4 casanova-page">
              <div className="row gy-3">
              {items.map((item) => (
  <div key={item.id} className="col">
    <div
      className={`card h-100 shadow-sm position-relative ${
        item.purchased ? 'border-success' : 'border-primary'
      }`}
    >
      {/* Indicador Circular de Quantidade */}
      <div className="progress-circle">
        <span className="progress-text">
          {item.quantity - (item.purchased ? 1 : 0)}/{item.quantity}
        </span>
      </div>

      {/* Imagem do item */}
      <img
        src={item.img}
        alt={item.name}
        className="card-img-top"
        style={{ objectFit: 'contain', height: '150px' }}
      />

      {/* Corpo do card */}
      <div className="card-body text-center">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">R$ {item.price.toFixed(2).replace('.', ',')}</p>
        <button
          className={`btn w-100 ${
            item.purchased ? 'btn-success' : 'btn-primary'
          }`}
          onClick={() => handleShowPayment(item)}
        >
          {item.purchased ? 'Comprado ✔️' : 'Pagar'}
        </button>
      </div>
    </div>
  </div>
))}

              </div>
              {/* Botões de navegação */}
              <button
                className={`navigation-arrow left ${
                  currentPage === 0 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 0}
              >
                ◀
              </button>
              <button
                className={`navigation-arrow right ${
                  items.length < itemsPerPage ? "disabled" : ""
                }`}
                onClick={() => handlePageChange("next")}
                disabled={items.length < itemsPerPage}
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}
  
      {/* Modal de Pagamento */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pagamento via PIX</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && pixCode && (
            <>
              <QRCodeSVG value={pixCode} size={200} />
              <textarea value={pixCode} readOnly />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
};

export default NewHomeGiftPage;