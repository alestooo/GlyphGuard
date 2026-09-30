use clap::{Parser, Subcommand};
use glyphguard_core::inspect::{inspect_graphemes, inspect_scalars};

#[derive(Debug, Parser)]
#[command(name = "glyphguard")]
#[command(version)]
#[command(about = "Unicode security inspection toolkit")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
    /// Inspect Unicode scalar values and grapheme clusters.
    Inspect {
        /// Text to inspect.
        text: String,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Inspect { text } => inspect(&text),
    }
}

fn inspect(text: &str) {
    println!("GlyphGuard Inspect");
    println!();
    println!("Input:");
    println!("{text}");
    println!();

    println!("Scalars:");

    for scalar in inspect_scalars(text) {
        let name = scalar
            .unicode_name
            .as_deref()
            .unwrap_or("<no Unicode name>");

        println!(
            "[{}] {:?}  {}  {}  bytes={}  byte_index={}",
            scalar.scalar_index,
            scalar.character,
            scalar.code_point_label(),
            name,
            scalar.utf8_hex(),
            scalar.byte_index
        );
    }

    println!();
    println!("Grapheme clusters:");

    for grapheme in inspect_graphemes(text) {
        println!(
            "[{}] {:?}  scalars={}  bytes={}  byte_index={}",
            grapheme.grapheme_index,
            grapheme.value,
            grapheme.scalar_count,
            grapheme.byte_length,
            grapheme.byte_index
        );
    }
}
