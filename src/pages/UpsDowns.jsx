import { useEffect } from "react";
import { motion } from "framer-motion";

function UpsDowns() {
  useEffect(() => {
    document.body.className = "frame-page page-ups-downs";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="frame-wrapper">
      <div className="frame-inner ups-inner">
        <motion.p
          className="ups-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        >
          Had your ups and
          <br />
          downs
        </motion.p>

        <motion.p 
          className="ups-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        >
          But you always
          <br />
          came back harder.
        </motion.p>
      </div>
    </div>
  );
}

export default UpsDowns;
