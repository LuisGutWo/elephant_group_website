import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaTimes,
  FaHeadset,
  FaFileInvoice,
  FaQuestionCircle,
} from "react-icons/fa";

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Verificar horario de atención (Lun-Vie 9:00-18:00, Sáb 9:00-13:00)
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 6 = Sábado
      const hour = now.getHours();

      if (day === 0) {
        // Domingo cerrado
        setIsOnline(false);
      } else if (day === 6) {
        // Sábado 9:00-13:00
        setIsOnline(hour >= 9 && hour < 13);
      } else {
        // Lunes-Viernes 9:00-18:00
        setIsOnline(hour >= 9 && hour < 18);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const whatsappNumber = "56920390272";

  const quickActions = [
    {
      id: "quote",
      icon: <FaFileInvoice />,
      label: "Solicitar Cotización",
      message: "Hola! Me gustaría solicitar una cotización para...",
      color: "#eab308",
    },
    {
      id: "support",
      icon: <FaHeadset />,
      label: "Soporte Técnico",
      message: "Hola! Necesito ayuda con...",
      color: "#3b82f6",
    },
    {
      id: "general",
      icon: <FaQuestionCircle />,
      label: "Consulta General",
      message: "Hola! Tengo una consulta sobre...",
      color: "#8b5cf6",
    },
  ];

  const handleQuickAction = (message) => {
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener noreferrer");
    setIsExpanded(false);
  };

  const handleMainClick = () => {
    if (!isExpanded) {
      const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        "Hola! Quiero más información sobre sus servicios."
      )}`;
      window.open(url, "_blank", "noopener noreferrer");
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <>
      <div className={`whatsapp-widget ${isExpanded ? "expanded" : ""}`}>
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="whatsapp-menu">
            <div className="whatsapp-menu-header">
              <div className="header-content">
                <div className="avatar-container">
                  <div className="avatar">
                    <FaWhatsapp />
                  </div>
                  <span
                    className={`status-indicator ${
                      isOnline ? "online" : "offline"
                    }`}
                  ></span>
                </div>
                <div className="header-text">
                  <h4>Elephant Group</h4>
                  <p className="status-text">
                    {isOnline ? (
                      <>
                        <span className="pulse-dot"></span>
                        En línea • Responde rápido
                      </>
                    ) : (
                      "Fuera de horario • Te responderemos pronto"
                    )}
                  </p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsExpanded(false)}
                aria-label="Cerrar menú"
              >
                <FaTimes />
              </button>
            </div>

            <div className="whatsapp-menu-body">
              <p className="welcome-text">¿En qué podemos ayudarte hoy?</p>

              <div className="quick-actions">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.message)}
                    style={{ "--action-color": action.color }}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-label">{action.label}</span>
                    <svg
                      className="action-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="chat-preview">
                <div className="chat-bubble">
                  <p>¡Hola! 👋</p>
                  <p>¿Cómo podemos ayudarte?</p>
                  <span className="chat-time">Ahora</span>
                </div>
              </div>
            </div>

            <div className="whatsapp-menu-footer">
              <button
                className="minimize-btn"
                onClick={() => setIsMinimized(true)}
              >
                Cerrar temporalmente
              </button>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          className={`whatsapp-main-btn ${isExpanded ? "active" : ""}`}
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
            } else {
              setIsExpanded(true);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            handleMainClick();
          }}
          aria-label="Abrir chat de WhatsApp"
        >
          <FaWhatsapp className="whatsapp-icon" />
          {!isExpanded && (
            <>
              <span className="notification-badge">1</span>
              <span className="pulse-ring"></span>
            </>
          )}
        </button>

        {/* Tooltip flotante */}
        {!isExpanded && (
          <div className="whatsapp-tooltip">
            <p>¿Necesitas ayuda?</p>
            <span>Haz clic para chatear</span>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppButton;
