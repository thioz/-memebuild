<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;

class EuSanction extends Command
{

	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'sanction:eu';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Display an inspiring quote';

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	protected $url = 'http://ec.europa.eu/external_relations/cfsp/sanctions/list/version4/global/global.xml';

	public function handle()
	{

		$data = $this->loadData();
		foreach ($data as $entity)
		{

			$model = \App\Model\SanctEntity::create([
					'external_id' => $entity['id']
			]);
			foreach ($entity['names'] as $name)
			{
				$normname = \App\Model\SanctName::normalizeName($name['wholename']);
				$parts = explode('_', $normname);

				$nameModel = \App\Model\SanctName::create([
						'wholename' => $name['wholename'],
						'normname' => $normname,
						'numparts' => count($parts),
						'entity_id' => $model->id
				]);
				foreach ($parts as $part)
				{
					\App\Model\SanctNamePart::create([
						'name_id' => $nameModel->id,
						'part' => $part
					]);
				}
			}
		}
	}

	function loadData()
	{
		$dom = new \DOMDocument();
		$contents = file_get_contents($this->url);
		$dom->preserveWhiteSpace = false;
		$dom->loadXML($contents);

		$xpath = new \DOMXPath($dom);
		$entityNodes = $xpath->query('//ENTITY');
		$data = [];
		foreach ($entityNodes as $node)
		{
			$entity = $this->parseEntityNode($node);
			$entity['names'] = [];
			$nameNodes = $xpath->query('NAME', $node);
			foreach ($nameNodes as $nameNode)
			{
				$entity['names'][] = $this->parseNameNode($nameNode);
			}

			$data[] = $entity;
		}
		return $data;
	}

	function parseNameNode($node)
	{
		$name = [];
		foreach ($node->childNodes as $child)
		{
			$name[strtolower($child->nodeName)] = $child->nodeValue;
		}
		return $name;
	}

	function parseEntityNode($node)
	{
		$entity = [];
		foreach ($node->attributes as $attr)
		{
			switch (strtolower($attr->nodeName))
			{
				case 'id':
					$entity['id'] = $attr->nodeValue;
					break;
				case 'entity_id':
					$entity['entity_id'] = $attr->nodeValue;
					break;
				case 'pdf_link':
					$entity['pdf_link'] = $attr->nodeValue;
					break;
			}
		}
		return $entity;
	}

}
