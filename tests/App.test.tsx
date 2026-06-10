import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';

describe('App', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('applies the default beige theme', async () => {
    render(<App />);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('theme-beige');
    });
  });

  it('toggles the footer theme control to dark mode', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Theme wechseln' }));

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('theme-dark');
    });
  });

  it('renders major routes from the hash router', async () => {
    window.location.hash = '#/leistungen/fotografie';
    render(<App />);

    expect(await screen.findByRole('heading', { name: 'Photography' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Schwerpunkte' })).toBeInTheDocument();
  });

  it('redirects invalid capability slugs to the 404 page', async () => {
    window.location.hash = '#/leistungen/nicht-vorhanden';
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Diese Seite gibt es nicht.' })
    ).toBeInTheDocument();
  });

  it('renders contact and legal routes', async () => {
    window.location.hash = '#/kontakt';
    const { unmount } = render(<App />);

    expect(await screen.findByRole('heading', { name: 'Lass uns sprechen.' })).toBeInTheDocument();
    expect(screen.getAllByText('WhatsApp').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /WhatsApp/i })[0]).toHaveAttribute(
      'href',
      'https://wa.me/4917621384822'
    );
    expect(screen.getAllByRole('link', { name: /Telefon/i })[0]).toHaveAttribute(
      'href',
      'tel:+4917621384822'
    );
    expect(screen.getAllByRole('link', { name: /Instagram/i })[0]).toHaveAttribute(
      'href',
      'https://www.instagram.com/up_socialbyjf?igsh=MW5taTRud2loaWZybw=='
    );
    expect(screen.getAllByRole('link', { name: /E-Mail/i })[0]).toHaveAttribute(
      'href',
      'mailto:info@up-social.de'
    );

    unmount();
    window.location.hash = '#/impressum';
    render(<App />);

    expect(await screen.findByRole('heading', { name: 'Impressum.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'info@up-social.de' })).toHaveAttribute(
      'href',
      'mailto:info@up-social.de'
    );
    expect(screen.getByRole('link', { name: '+49 176 21384822' })).toHaveAttribute(
      'href',
      'tel:+4917621384822'
    );
  });

  it('opens and closes the contact panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'Jetzt buchen' })[0]!);
    expect(await screen.findByRole('heading', { name: 'Lass uns reden.' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Schließen' }));

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Lass uns reden.' })).not.toBeInTheDocument();
    });
  });
});
