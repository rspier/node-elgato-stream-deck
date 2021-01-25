import { KeyIndex, StreamDeck, StreamDeckProxy } from '@elgato-stream-deck/core'

export class StreamDeckWeb extends StreamDeckProxy {
	constructor(device: StreamDeck) {
		super(device)
	}

	public fillKeyCanvas(keyIndex: KeyIndex, canvas: HTMLCanvasElement): Promise<void> {
		this.checkValidKeyIndex(keyIndex)

		const ctx = canvas.getContext('2d')
		if (!ctx) {
			throw new Error('Failed to get canvas context')
		}

		const data = ctx.getImageData(0, 0, this.ICON_SIZE, this.ICON_SIZE)
		return this.device.fillKeyBuffer(keyIndex, Buffer.from(data.data), { format: 'rgba' })
	}

	public fillPanelCanvas(canvas: HTMLCanvasElement): Promise<void> {
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			throw new Error('Failed to get canvas context')
		}

		const data = ctx.getImageData(0, 0, this.ICON_SIZE * this.KEY_COLUMNS, this.ICON_SIZE * this.KEY_ROWS)
		return this.device.fillPanelBuffer(Buffer.from(data.data), { format: 'rgba' })
	}
}