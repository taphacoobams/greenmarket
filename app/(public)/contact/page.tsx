"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Merci de remplir tous les champs.");
      return;
    }
    toast.success("Message envoyé", {
      description: "Nous vous répondons sous 24h ouvrées.",
    });
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-xl space-y-8 px-4 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="text-muted-foreground">
        Une question sur une commande ou un partenariat producteurs ? Écrivez-nous, notre équipe vous répond rapidement.
      </p>
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-[2rem] border border-border bg-card p-8 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl"
            placeholder="Votre nom"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mail">Email</Label>
          <Input
            id="mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl"
            placeholder="vous@exemple.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="msg">Message</Label>
          <Textarea
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Comment pouvons-nous vous aider ?"
            className="rounded-[1rem]"
          />
        </div>
        <Button type="submit" className="w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          Envoyer
        </Button>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        Ou appelez le +221 33 000 00 00 · bonjour@greenmarket.sn
      </div>
    </div>
  );
}
